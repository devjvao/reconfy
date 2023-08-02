import asyncio
import json
import uuid

import cv2
import torch
from starlette.websockets import WebSocket, WebSocketState
from yolov5.utils.dataloaders import LoadStreams
from yolov5.utils.general import Profile, non_max_suppression, scale_boxes
from yolov5.utils.plots import Annotator, colors

from app.util.model import GlobalModelInstance
from app.util.singleton import SingletonMeta


class StreamController(metaclass=SingletonMeta):
    def __init__(self):
        self.streams = {}

    def add(self, camera_id: int, websocket: WebSocket):
        key = str(uuid.uuid4())

        self.streams[key] = {
            "camera_id": camera_id,
            "websocket": websocket,
        }

        return key

    async def remove(self, key):
        config = self.streams[key]
        websocket = config['websocket']

        if websocket.client_state is not WebSocketState.DISCONNECTED:
            await websocket.close()

        del self.streams[key]


async def load_source(url: str, key: str):
    controller = StreamController()
    config = controller.streams[key]
    websocket = config['websocket']

    conf_threshold = 0.6
    iou_threshold = 0.6

    instance = GlobalModelInstance()
    model = instance.model

    dataset = LoadStreams(url, img_size=instance.imgsz, stride=model.stride, auto=model.pt)

    dt = (Profile(), Profile(), Profile())

    try:
        for path, input_image, original_images, video_capture, image_size in dataset:
            with dt[0]:
                input_image = torch.from_numpy(input_image).to(model.device)
                input_image = input_image.half() if model.fp16 else input_image.float()  # uint8 to fp16/32
                input_image /= 255  # 0 - 255 to 0.0 - 1.0

                if len(input_image.shape) == 3:
                    input_image = input_image[None]  # expand for batch dim

            # Inference
            with dt[1]:
                prediction = model(input_image)

            # Filter out redundant or overlapping bounding boxes using NMS
            with dt[2]:
                prediction = non_max_suppression(prediction=prediction, conf_thres=conf_threshold,
                                                 iou_thres=iou_threshold, max_det=1000)

            for i, detection in enumerate(prediction):
                result_image = original_images[i].copy()
                has_fire = len(detection) > 0
                annotator = Annotator(result_image, line_width=3, example=str(model.names))

                if has_fire:
                    # Rescale boxes to the original image size
                    detection[:, :4] = scale_boxes(input_image.shape[2:], detection[:, :4], result_image.shape).round()

                    for *xyxy, conf, cls in reversed(detection):
                        c = int(cls)
                        label = f'{model.names[c]} {conf:.2f}'
                        annotator.box_label(xyxy, label, color=colors(c, True))

                result_image = annotator.result()
                (flag, encoded_image) = cv2.imencode(".jpg", result_image)

                if not flag:
                    continue

                # yield im0 if isinstance(im0, Image.Image) else Image.fromarray(im0)
                yield b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encoded_image) + b'\r\n'

                json_payload = json.dumps({
                    "hasFire": has_fire,
                })

                if websocket.client_state is WebSocketState.CONNECTED:
                    await websocket.send_text(json_payload)

                await asyncio.sleep(0)
    except asyncio.CancelledError:
        await controller.remove(key)

        print('Disconnected')
