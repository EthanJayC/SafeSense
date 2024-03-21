import { render, fireEvent } from "@testing-library/react-native";
import Register from "../../app/(public)/register";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import createUserInformation from "../../app/(public)/register";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
}));

//functions as the Arrange
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: {
        uid: "420",
      },
    })
  ),
}));

jest.mock("../../app/(public)/register", () => jest.fn());

//Act
test("handleRegistration creates user and updates state", async () => {
  const { getByTestId } = render(<Register />);

  //Mock the inputs
  const emailInput = getByTestId("email-id");
  const passwordInput = getByTestId("password-id");

  fireEvent.changeText(emailInput, "test@test.com");
  fireEvent.changeText(passwordInput, "password");

  //Trigger the registration function
  const registerButton = getByTestId("registerButton-id");
  fireEvent.press(registerButton);

  //Assert the user was created
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
    FIREBASE_AUTH,
    "test@test.com",
    "password"
  );

  //Assert createUserInformation was called with correct args
  expect(createUserInformation).toHaveBeenCalledWith({ user: { uid: "420" } });
});
