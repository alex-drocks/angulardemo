export interface Tax {
    label: string,
    tax1: {
        label: string,
        rate: number,
    },
    tax2?: {
        label: string,
        rate: number,
    }
}

export const taxRates = {
    quebec: {
        label: "Taxes du Québec",
        tax1: {
            label: "TPS",
            rate: 0.05,
        },
        tax2: {
            label: "TVQ",
            rate: 0.09975,
        },
    } as Tax,

    ontario: {
        label: "Taxes de l'Ontario",
        tax1: {
            label: "HST",
            rate: 0.13,
        },
    } as Tax,

}