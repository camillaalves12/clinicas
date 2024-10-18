import { Table } from "../../components/Table/Table";
import { Header } from "../../components/Header/Header";
import S from "./styles.module.scss";

export function ProceduresPage() {
  return (
    <>
      <Header />
      <div className={S.pageInitial}>
        <h2>Resumo</h2>
        <div className={S.table}>
          <Table />
        </div>
      </div>
    </>
  );
}
