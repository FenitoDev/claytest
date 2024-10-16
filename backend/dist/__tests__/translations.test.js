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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const translations_1 = require("../routes/translations");
const prisma_1 = __importDefault(require("../prisma"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/translations", translations_1.translationsRouter);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$connect();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.translation.deleteMany({});
    yield prisma_1.default.$disconnect();
}));
describe("Translations API", () => {
    let translationId;
    it("should create a new translation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/api/translations").send({
            language: "en",
            key: "hello",
            text: "Hello World",
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        translationId = res.body.id;
    }));
    it("should retrieve translations by language", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/api/translations/en");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    }));
    it("should update a translation completely", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .put(`/api/translations/${translationId}`)
            .send({
            language: "en",
            key: "hello",
            text: "Hello Updated",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.text).toBe("Hello Updated");
    }));
    it("should update a translation partially", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .patch(`/api/translations/${translationId}`)
            .send({
            text: "Hello Partially Updated",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.text).toBe("Hello Partially Updated");
    }));
    it("should delete a translation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete(`/api/translations/${translationId}`);
        expect(res.statusCode).toEqual(204);
    }));
    it("should return 200 for a non-existent language", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get(`/api/translations/nonexistent`);
        expect(res.statusCode).toEqual(200);
    }));
});
