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

export const Login = () => {
  const { register } = useForm();

  return (
    <AuthContainer>
      <Typography variant="h2" color="--secundary-color">
        Login
      </Typography>
      <Typography variant="body" className={styles.textCenter}>
        Bem vindo! Que bom ter você de volta!
      </Typography>
      <Form>
        <Label htmlFor="email">Email</Label>
        <Input
          register={register}
          registerName="email"
          type="text"
          id="email"
          placeholder="Insira seu email"
          required
        ></Input>
        <Label htmlFor="password">Senha</Label>
        <Input
          register={register}
          registerName="password"
          type="text"
          id="password"
          placeholder="Insira sua senha"
          required
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
