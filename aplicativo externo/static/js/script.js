fetch('http://localhost:3000/api/amigos')
            .then(response => response.json())
            .then(amigos => {
                const tbody = document.getElementById('tabela-amigos');
                tbody.innerHTML = '';

                amigos.forEach(amigo => {
                    const tr = document.createElement('tr');

                    const dataCriacao = new Date(amigo.createdAt)
                        .toLocaleString('pt-BR');

                    tr.innerHTML = `
                        <td>${amigo.id}</td>
                        <td>${amigo.nome}</td>
                        <td>${amigo.email}</td>
                        <td>${dataCriacao}</td>
                    `;

                    tbody.appendChild(tr);
                });
            })
            .catch(err => {
                document.getElementById('tabela-amigos').innerHTML = `
                    <tr>
                        <td colspan="4">Erro ao carregar os dados</td>
                    </tr>
                `;
                console.error(err);
            });