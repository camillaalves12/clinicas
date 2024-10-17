import S from "./styles.module.scss";
import { Header } from "../../components/Header/Header";
import { useState } from "react";
import { api } from "../../services/api";
import Button from "react-bootstrap/Button";
import { Negative } from "../../components/Negative/Negative";

export function RegisterDoctorPage() {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
  });

  const getClinicId = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const clinicId = userData?.user?.clinicaId;
    console.log(clinicId);
    return clinicId;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    const clinicId = getClinicId();

    if (!clinicId) {
      alert("Erro: ID da clínica não encontrado.");
      return;
    }

    api
      .post(`/professional/${clinicId}`, dataToSend)
      .then((response) => {
        console.log(response);
        setModalShow(true); // Exibe o modal após o sucesso

        setFormData({
          nome: "",
          especialidade: "",
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
        id="registerDoctorForm"
        className={S.container}
        onSubmit={handleSubmit}
      >
        <div className={S.containerForm}>
          <h3 style={{ marginBottom: "1.5rem" }}>Cadastrar profissional</h3>

          <label className={S.labelForm} htmlFor="nameProfessional">
            Nome:
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="nameProfessional"
            name="nome"
            onChange={handleInputChange}
            value={formData.nome} // Valor do campo
            required
          />

          <label className={S.labelForm} htmlFor="specialty">
            Especialidade:
          </label>
          <input
            className={S.inputForm}
            type="text"
            id="specialty"
            name="especialidade"
            onChange={handleInputChange}
            value={formData.especialidade} // Valor do campo
            required
          />

          <div className={S.divBtn}>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>

            <Negative
              description="Profissional registrado com sucesso!"
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </form>
    </>
  );
}
