import { AuthContainer } from "../../components/AuthContainer";
import { Form } from "../../components/Form";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import Typography from "../../components/Typography";
import { useForm } from "react-hook-form";

import googleImg from "./google.png";
import styles from "./register.module.css";
import { Button } from "../../components/Button";
import { DividerLine } from "../../components/DividerLine";
import { UserIcon } from "../../components/UserIcon";

export const Register = () => {
  const { register } = useForm();

  return (
    <AuthContainer>
      <Typography variant="h2" color="--secundary-color">
        Cadastre-se
      </Typography>
      <Typography variant="body" className={styles.textCenter}>
        Bem vindo! Crie uma nova conta.
      </Typography>
      <Form>
        <Label htmlFor="name">Nome</Label>
        <Input
          register={register}
          registerName="name"
          type="text"
          id="name"
          placeholder="Insira seu nome completo"
          required
        ></Input>
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
        <Button className={styles.registerBtn} type="submit">
          Submeter
        </Button>
        <DividerLine>ou</DividerLine>
        <div className={styles.altOptions}>
          <Button altBtn={true} className={styles.googleBtn} href="#">
            <img src={googleImg} alt="Google Image"></img>
          </Button>
          <button className={styles.loginArea}>
            <Typography variant="body">Faça seu Login</Typography>
            <UserIcon className={styles.loginIcon}></UserIcon>
          </button>
        </div>
      </Form>
    </AuthContainer>
  );
};
