import styles from "./login.module.css";
import { AuthContainer } from "../../components/AuthContainer";
import { Form } from "../../components/Form";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import Typography from "../../components/Typography";
import { useForm } from "react-hook-form";

import googleImg from "./google.png";
import { Button } from "../../components/Button";
import { DividerLine } from "../../components/DividerLine";
import { UserIcon } from "../../components/UserIcon";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export const Login = () => {
  const { register: registerLogin, handleSubmit: handleSubmitLogin } =
    useForm();
  const { loginUser } = useAuth();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleOnSubmit = async (data) => {
    setEmailError("");
    setPasswordError("");

    const response = await loginUser(data);
    if (!response.success) {
      if (response.field === "password") {
        setPasswordError(response.error);
      } else {
        setEmailError(response.error);
      }
    }
  };

  return (
    <AuthContainer>
      <Typography variant="h2" color="--secundary-color">
        Login
      </Typography>
      <Typography variant="body" className={styles.textCenter}>
        Bem vindo! Que bom ter você de volta!
      </Typography>
      <Form handleOnSubmit={handleOnSubmit} handleSubmit={handleSubmitLogin}>
        <Label htmlFor="email">Email</Label>
        <Input
          register={registerLogin}
          registerName="email"
          type="text"
          id="email"
          placeholder="Insira seu email"
          required
          error={emailError}
        ></Input>
        <Label htmlFor="password">Senha</Label>
        <Input
          register={registerLogin}
          registerName="password"
          type="text"
          id="password"
          placeholder="Insira sua senha"
          required
          error={passwordError}
        ></Input>
        <Button className={styles.loginBtn} type="submit">
          Submeter
        </Button>
        <DividerLine>ou</DividerLine>
        <div className={styles.altOptions}>
          <Button altBtn={true} className={styles.googleBtn} href="#">
            <img src={googleImg} alt="Google Image"></img>
          </Button>
          <button className={styles.registerArea}>
            <Typography variant="body">Cadastre-se</Typography>
            <UserIcon className={styles.registerIcon}></UserIcon>
          </button>
        </div>
      </Form>
    </AuthContainer>
  );
};
