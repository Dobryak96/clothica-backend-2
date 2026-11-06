// TODO: перевірити, що користувач має роль admin. Поки що пропускає всіх.
export const requireAdmin = (req, res, next) => {
    next();
};
