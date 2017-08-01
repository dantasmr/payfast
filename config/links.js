exports.getLinks = function(id) {

    const links = 
    [{
            method: 'PUT',
            href: `http://localhost:3000/pagamento/${id}`,
            rel: 'cofirma'
        },
        {
            method: 'DELETE',
            href: `http://localhost:3000/pagamento/${id}`,
            rel: 'cancelar'
        },
        {
            method: 'GET',
            href: `http://localhost:3000/pagamento/${id}`,
            rel: 'confirma'
        },
        {
            method: 'PATCH',
            href: `http://localhost:3000/pagamento/${id}`,
            rel: 'cofirma'
        },
        {
            method: 'OPTION',
            href: `http://localhost:3000/pagamento${id}`,
            rel: 'head'
        }
    ]

    return links;


}
