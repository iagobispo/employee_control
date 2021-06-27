const client = require('../infra/database');

module.exports = {
    async index(req, res) {
        try {
            const results = await (await client.query('SELECT * FROM employee')).rows;

            res.json(results);
        } catch (err) {
            console.log(err);
        }
    },

    async show(req, res) {
        try {
            const search = req.query.search
            console.log(search)
            const results = await client.query('select * from employee where name || occupation || phone1 || cpf_cnpj || regime  ilike $1', ['%' + search + '%'])
            res.send(results.rows)
        } catch (error) {
            console.log(error)
        }
    },

    async create(req, res) {
        try {
            const { name, cpf_cnpj, email, occupation, regime, phone1, phone2 } = req.body;

            const verifica = (await client.query("SELECT * FROM employee WHERE email = $1", [email])).rows
            if (verifica.length > 0) {
                return res.json({ Error: 'employee already registered.' })
            }

            const sql = 'INSERT INTO employee(name, cpf_cnpj, email, occupation, regime, phone1, phone2) VALUES ($1,$2,$3,$4,$5,$6,$7);';
            const values = [name, cpf_cnpj, email, occupation, regime, phone1, phone2];
            await client.query(sql, values);

            return res.send('successful registered employee.')

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'error registering employee.' })
        }
    },

    async update(req, res) {
        try {
            const { name, cpf_cnpj, email, occupation, regime, phone1, phone2 } = req.body;
            const id = Number(req.query.id);

            const sql = `UPDATE employee SET name=$1, cpf_cnpj=$2, email=$3, occupation=$4, regime=$5, phone1=$6, phone2=$7 WHERE idEmployee = ${id} `;
            const values = [name, cpf_cnpj, email, occupation, regime, phone1, phone2];
            await client.query(sql, values);
            res.send('employee successfully changed.')

        } catch (error) {
            return res.status(400).send({ error: 'it was not possible to change.' })
        }

    }

}