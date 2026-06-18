import { AuthContainer } from "../../components/AuthContainer";
import { Form } from "../../components/Form";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import Typography from "../../components/Typography";
import { useForm } from "react-hook-form";

import styles from "./register.module.css";

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
          placeHolder="Insira seu nome completo"
          required
        ></Input>
        <Label htmlFor="email">Email</Label>
        <Input
          register={register}
          registerName="email"
          type="text"
          id="email"
          placeHolder="Insira seu email"
          required
        ></Input>
        <Label htmlFor="password">Senha</Label>
        <Input
          register={register}
          registerName="password"
          type="text"
          id="password"
          placeHolder="Insira sua senha"
          required
        ></Input>
      </Form>
    </AuthContainer>
  );
};
