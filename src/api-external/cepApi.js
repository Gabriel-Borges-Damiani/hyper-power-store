export const getAddressByCep = async (cep) => {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao consultar o CEP");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return data;
};
