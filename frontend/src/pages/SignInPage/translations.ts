export interface SignInPageTranslations {
    title: string
    description: string
    action: string
    fields: {
        username: {
            label: string
            error: {
                empty: string
                invalid: string
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
