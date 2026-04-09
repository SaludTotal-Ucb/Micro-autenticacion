import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    try {
        // Obtener token del header Authorization: Bearer TOKEN
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado',
            });
        }
        // Verificar y decodificar JWT
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
            });
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token inválido o expirado',
        });
    }
};
