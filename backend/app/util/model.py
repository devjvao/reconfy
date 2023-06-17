from yolov5.models.common import DetectMultiBackend
from yolov5.utils.general import check_img_size
from yolov5.utils.torch_utils import select_device

from app.core.config import settings
from app.util.singleton import SingletonMeta


class GlobalModelInstance(metaclass=SingletonMeta):
    def __init__(self):
        self.device = select_device()
        self.model = DetectMultiBackend(settings.MODEL_WEIGHTS_PATH, device=self.device)
        self.imgsz = check_img_size((640, 640), s=self.model.stride)

        # Warm up the model by running inference once
        self.model.warmup(imgsz=(1, 3, *self.imgsz))
