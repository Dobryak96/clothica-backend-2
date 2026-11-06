// TODO: перевірити, що користувач авторизований. Поки що пропускає всіх.
export const authenticate = (req, res, next) => {
    next();
};
