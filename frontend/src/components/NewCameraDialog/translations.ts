export interface NewCameraDialogTranslations {
    title: string
    action: string
    error: {
        internal: string
    }
    fields: {
        url: {
            label: string
            error: {
                empty: string
                conflict: string
            }
        }
        name: {
            label: string
            error: {
                empty: string
            }
        }
        description: {
            label: string
        }
    }
}
