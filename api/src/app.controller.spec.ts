import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpStatus } from "@nestjs/common";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe("index", () => {
    it("should return result of ping", async () => {
      // Arrange
      const expectedResult = { ping: "Hans Yulian" };
      jest.spyOn(appService, "index").mockReturnValue(expectedResult);
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      // Act
      await appController.index(mockResponse as any);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
    });
  });
});
