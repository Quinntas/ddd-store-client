// How data will be returned to end user
export const selectData = {
    publicId: true,
    user: {
        select: {
            publicId: true,
            name: true,
            email: true,
            password: true
        }
    },
    wallet: {
        select: {
            publicId: true,
            currentBalance: true
        }
    }
}