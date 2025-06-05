const pg = require("pg")
const client = new pg.Client('postgres://localhost/vacation_agency')
const {v4} = require('uuid')
const uuidv4 = v4

const createUser = async (user) => {
    const SQL = `
        INSERT INTO users
        (id, name)
        VALUES
        ($1, $2)
        RETURNING *  
    `
    const response = await client.query(SQL , [uuidv4(), user.name])
    return response.rows[0]
}

const createPlace = async (place) => {
    const SQL = `
        INSERT INTO places
        (id, name)
        VALUES
        ($1, $2)
        RETURNING *  
    `
    const response = await client.query(SQL , [uuidv4(), place.name])
    return response.rows[0]
}

const createVacation = async (vaycay) => {
    const SQL = `
        INSERT INTO vacations
        (id , user_id , place_id)
        VALUES
        ($1 , $2 , $3)
        RETURNING *
    `
    const response = await client.query(SQL , [uuidv4() , vaycay.user_id , vaycay.place_id ])
    return response.rows[0]
}

const fetchUsers = async () => {
    const SQL = `
        SELECT *
        FROM users
    `
    const response = await client.query(SQL)
    return response.rows
}

 
const seed = async () => {
    const SQL = `
        DROP TABLE IF EXISTS vacations;
        DROP TABLE IF EXISTS places;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users(
            id UUID PRIMARY KEY,
            name VARCHAR(100) UNIQUE
        );

        CREATE TABLE places(
            id UUID PRIMARY KEY,
            name VARCHAR(100)
        );

        CREATE TABLE vacations(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL,
            place_id UUID REFERENCES places(id) NOT NULL,
            created_at TIMESTAMP DEFAULT now()
        );
    `
    await client.query(SQL)

    const [mo, joe, flo, ethyl, henry, lucy] = await Promise.all([
        createUser({name: "Mo"}),
        createUser({name: "Joe"}),
        createUser({name: "Flo"}),
        createUser({name: "Ethyl"}),
        createUser({name: "Henry"}),
        createUser({name: "Lucy"})
    ])

    const [japan, scotland, newZealand, italy, ghana, krypton, argentina] = await Promise.all([
        createPlace({name: "Japan"}),
        createPlace({name: "Scotland"}),
        createPlace({name: "New Zealand"}),
        createPlace({name: "Italy"}),
        createPlace({name: "Ghana"}),
        createPlace({name: "Krypton"}),
        createPlace({name: "Argentina"})
    ])

    await Promise.all([
        createVacation({user_id: joe.id , place_id:krypton.id}),
        createVacation({user_id: flo.id , place_id:krypton.id}),
        createVacation({user_id: henry.id , place_id:krypton.id}),
        createVacation({user_id: henry.id , place_id:italy.id}),
        createVacation({user_id: mo.id , place_id:argentina.id}),
        createVacation({user_id: joe.id , place_id:newZealand.id}),
    ])

    console.log('Created tables & seeded data')
}



module.exports = {
    seed,
    client,
    fetchUsers
}