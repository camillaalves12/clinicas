import { useState } from "react";
import { Header } from "../../components/Header/Header";
import S from "./styles.module.scss";
import { api } from "../../services/api";
import { Confirm } from "../../components/Confirm/Confirm";
import Button from "react-bootstrap/Button";

export function RegisterPatientPage() {
  const [modalShow, setModalShow] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    data_de_nascimento: "",
    telefone: "",
    sexo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Verifica se o campo é o CPF e formata o valor com pontos e traço
    if (name === "cpf") {
      const formattedCPF = formatCPF(value);
      setFormData({ ...formData, [name]: formattedCPF });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatCPF = (value) => {
    // Remove qualquer caractere não numérico do valor do CPF
    const numericCPF = value.replace(/\D/g, "");

    // Aplica a formatação: XXX.XXX.XXX-XX
    const formattedCPF = numericCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    return formattedCPF;
  };

  const getClinicId = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const clinicId = userData?.user?.clinicaId;
    console.log(clinicId);
    return clinicId;
  };

  const formatDateToApiFormat = (date) => {
    const parts = date.split("/");
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return date;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria uma cópia do formData para evitar alterações diretas no estado
    const dataToSend = { ...formData };

    // Converte a data para o formato esperado pela API antes de enviar
    dataToSend.data_de_nascimento = formatDateToApiFormat(
      formData.data_de_nascimento
    );

    console.log(dataToSend);
    const clinicId = getClinicId();

    api
      .post(`/patient/${clinicId}`, dataToSend)
      .then((response) => {
        console.log(response);
        setModalShow(true); // Exibe o modal após o sucesso

        // Limpa os campos do formulário
        setFormData({
          nome: "",
          cpf: "",
          data_de_nascimento: "",
          telefone: "",
          sexo: "",
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  return (
    <>
      <Header />
      <form
        id="registerPatientForm"
        className={S.container}
        onSubmit={handleSubmit}
      >
        <div className={S.containerForm}>
          <h3 style={{ marginBottom: "1.5rem" }}>Cadastrar paciente</h3>

          <label className={S.labelForm} htmlFor="namePatient">
            Nome Completo:
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="namePatient"
            name="nome"
            onChange={handleInputChange}
            value={formData.nome}
            required
          />

          <div className={S.divForms}>
            <div>
              <label className={S.labelForm} htmlFor="date_birth">
                Data de nascimento:
              </label>
              <input
                className={S.inputForm}
                style={{ width: "255px", padding: "5px" }}
                type="date"
                id="date_birth"
                name="data_de_nascimento"
                onChange={handleInputChange}
                value={formData.data_de_nascimento}
                required
              />
            </div>

            <div>
              <label className={S.labelForm} htmlFor="cpf_patient">
                CPF:
              </label>
              <input
                className={S.inputForm}
                style={{ width: "255px" }}
                type="text"
                id="cpf_patient"
                name="cpf"
                onChange={handleInputChange}
                value={formData.cpf}
                required
                maxLength="14" // Limita o campo a 14 caracteres (XXX.XXX.XXX-XX)
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" // Valida o padrão do CPF
                title="Digite um CPF válido"
              />
            </div>
          </div>

          <div
            className={S.divForms}
            style={{ gap: "1rem", marginTop: "0.2rem", marginBottom: "0.2rem" }}
          >
            <label className={S.labelForm} htmlFor="sex">
              Sexo:
            </label>
            <div>
              <label htmlFor="feminine" style={{ marginRight: "7px" }}>
                Feminino
              </label>
              <input
                type="radio"
                id="feminine"
                name="sexo"
                value="F"
                checked={formData.sexo === "F"}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="masculine" style={{ marginRight: "7px" }}>
                Masculino
              </label>
              <input
                type="radio"
                id="masculine"
                name="sexo"
                value="M"
                checked={formData.sexo === "M"}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <label className={S.labelForm} htmlFor="phone">
            Telefone:
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="valor"
            step="0.01"
            name="telefone"
            onChange={handleInputChange}
            value={formData.telefone}
            required
          />

          <div className={S.divBtn}>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>

            <Confirm
              description="Paciente registrado com sucesso!"
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </form>
    </>
  );
}
