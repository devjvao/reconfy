export interface CameraDialogTranslations {
    title: {
        new: string
        edit: string
    }
    action: {
        new: string
        edit: string
    }
    notification: {
        success: {
            new: string
            edit: string
        }
        error: {
            internal: string
        }
    }
    fields: {
        url: {
            label: string
            error: {
                empty: string
                conflict: string
                max: string
            }
        }
        name: {
            label: string
            error: {
                empty: string
                max: string
            }
        }
    }
}
