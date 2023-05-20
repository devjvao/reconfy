export interface SignUpPageTranslations {
    title: string
    description: string
    action: string
    error: {
        internal: string
    }
    fields: {
        name: {
            label: string
            error: {
                empty: string
            }
        }
        email: {
            label: string
            error: {
                empty: string
                invalid: string
                conflict: string
            }
        }
        password: {
            label: string
            error: {
                empty: string
            }
        }
    }
}
