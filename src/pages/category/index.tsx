import { FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';
import { toast } from 'react-toastify';

import { setupApiClient } from '../../services/api';

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            toast.warning('Digite o nome da categoria!')
            return;
        }

        const apiClient = setupApiClient();
        await apiClient.post('/category', {
            name
        });

        toast.success('Categoria cadastrada com sucesso.');
        setName('');
    }

    return (
        <>
            <Head>
                <title>Nova Categoria - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastrar Categoria</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button type="submit" className={styles.buttonAdd}>
                            Cadastrar
                        </button>

                    </form>

                </main>
            </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})