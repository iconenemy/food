"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const password_service_1 = __importDefault(require("../services/password.service"));
const token_service_1 = __importDefault(require("../services/token.service"));
class AuthController {
    constructor(UserService, PasswordService, TokenService) {
        this.UserService = UserService;
        this.PasswordService = PasswordService;
        this.TokenService = TokenService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, phone_number } = req.body;
            const candidateByUsername = yield this.UserService.findUserByUsername({ username });
            if (candidateByUsername)
                return res.status(400).json({ message: `This username is already in use. Please try different username.` });
            const candidateByEmail = yield this.UserService.findUserByEmail({ email });
            if (candidateByEmail)
                return res.status(400).json({ message: `This email is already in use. Please try different email.` });
            const candidateByPhoneNumber = yield this.UserService.findUserByPhoneNumber({ phone_number });
            if (candidateByPhoneNumber)
                return res.status(400).json({ message: `This phone is already in use. Please try different phone.` });
            const hashPassword = yield this.PasswordService.hashPassword(password);
            const newUser = yield this.UserService.createUser(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
            yield newUser.save();
            return res.status(201).json({
                message: 'User has been created',
                status: 201
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const candidate = yield this.UserService.findUserByUsername({ username });
            if (!candidate)
                return res.status(400).json({ message: 'User with such username does not exist or password is wrong' });
            const isMatchPassword = yield this.PasswordService.comparePassword(password, candidate.password);
            if (!isMatchPassword)
                return res.status(400).json({ message: 'User with such username does not exist or password is wrong' });
            if (candidate.is_active === false)
                res.status(400).json({ message: 'User with such username does not have an access to content' });
            const payload = {
                _id: candidate._id,
                username: candidate.username,
                role: candidate.role
            };
            const { accessToken, refreshToken } = this.TokenService.generateToken(payload);
            const tokenCandidate = yield this.TokenService.findTokenByUserId(payload._id);
            if (tokenCandidate) {
                if (tokenCandidate.refresh_token.length > 1) {
                    yield this.TokenService.popTokenByUserId(tokenCandidate.user_id);
                }
                yield this.TokenService.pushTokenByUserId(tokenCandidate.user_id, refreshToken);
            }
            else {
                const newtoken = yield this.TokenService.createToken(candidate._id);
                yield newtoken.save();
                yield this.TokenService.pushTokenByUserId(newtoken.user_id, refreshToken);
            }
            const cookieOptions = {
                expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000),
                maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000,
                httpOnly: true
            };
            res.cookie('refresh_token', refreshToken, cookieOptions);
            return res.status(200).json({
                message: 'Success login',
                status: 200,
                username: candidate.username,
                role: candidate.role,
                id: candidate._id,
                accessToken,
                refreshToken
            });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refresh_token } = req.cookies;
            if (!refresh_token)
                return res.status(403).json({
                    message: 'The client does not have access rights to the content'
                });
            const { _id } = this.TokenService.veriftyRefreshToken(refresh_token);
            yield this.TokenService.findAndPullToken(_id, refresh_token);
            res.clearCookie('refresh_token');
            return res.status(200).json({
                message: 'success logout',
                status: 200
            });
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refresh_token } = req.cookies;
            if (refresh_token === null)
                return res.status(405).json('No token provided');
            const { _id } = this.TokenService.veriftyRefreshToken(refresh_token);
            if (!_id)
                return res.status(403).json({ message: 'Forbidden decoded' });
            const token = yield this.TokenService.findTokenByUserId(_id);
            if (!token)
                return res.status(403).json({ message: 'Forbidden session' });
            const user = yield this.UserService.findUserById(_id);
            if (!user)
                return res.status(403).json({ message: 'Forbidden user' });
            yield this.TokenService.findAndPullToken(_id, refresh_token);
            res.clearCookie('refresh_token');
            const payload = {
                _id: user._id,
                username: user.username,
                role: user.role
            };
            const { accessToken, refreshToken } = this.TokenService.generateToken(payload);
            yield this.TokenService.pushTokenByUserId(payload._id, refreshToken);
            const cookieOptions = {
                expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000),
                maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000,
                httpOnly: true
            };
            res.cookie('refresh_token', refreshToken, cookieOptions);
            return res.status(200).json({
                message: 'Success refresh',
                status: 200,
                accessToken,
                refreshToken,
                role: user.role,
                username: user.username,
                id: user._id
            });
        });
    }
}
exports.default = new AuthController(new user_service_1.default, new password_service_1.default, new token_service_1.default);
