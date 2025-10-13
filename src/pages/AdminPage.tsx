import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Api from "../services/ApiService";

type User = {
  _id: string;
  nome: string;
  sobrenome: string;
  email: string;
  matricula?: string;
  roles: string[];
  ativo: boolean;
  createdAt?: string;
};

const getUserIdentifier = (user: User) => {
  if (user.roles.includes("ROLE_ALUNO") && user.matricula) {
    return user.matricula;
  }
  return user.email;
};

// 🔥 Função para determinar o tipo de identificador (para styling)
const getIdentifierType = (user: User) => {
  if (user.roles.includes("ROLE_ALUNO") && user.matricula) {
    return "matrícula";
  }
  return "email";
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Data inválida" : date.toLocaleDateString('pt-BR');
  } catch {
    return "Data inválida";
  }
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await Api.get("users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users || res.data);
      console.log("Recebi: ", res.data)
    } catch (err: any) {
      console.error("Erro ao carregar usuários:", err);
      setError("Erro ao carregar lista de usuários");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRoles = async (userId: string, newRoles: string[]) => {
    try {
      const token = localStorage.getItem("token");
      await Api.put(`users/${userId}/roles`, { roles: newRoles }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Atualiza a lista local
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, roles: newRoles } : user
      ));
      alert("Permissões atualizadas com sucesso!");
    } catch (err: any) {
      console.error("Erro ao atualizar roles:", err);
      alert("Erro ao atualizar permissões do usuário");
    }
  };

  const toggleRole = (userId: string, role: string) => {
    const user = users.find(u => u._id === userId);
    if (!user) return;

    const newRoles = user.roles.includes(role)
      ? user.roles.filter(r => r !== role) // Remove role
      : [...user.roles, role]; // Adiciona role

    updateUserRoles(userId, newRoles);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
          <button
            onClick={loadUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Atualizar Lista
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Identificação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissões
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <UserRow 
                    key={user._id} 
                    user={user} 
                    onToggleRole={toggleRole}
                  />
                ))}
              </tbody>
            </table>

            {users.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                Nenhum usuário encontrado
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// omponente para cada linha de usuário
function UserRow({ user, onToggleRole }: { user: User; onToggleRole: (userId: string, role: string) => void }) {
  const rolesOptions = [
    "ROLE_USER",
    "ROLE_ALUNO",
    "ROLE_CANTINA", 
    "ROLE_SER",
  ];

  const identifier = getUserIdentifier(user);
  const identifierType = getIdentifierType(user);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.nome} {user.sobrenome}</div>
        <div className="text-sm text-gray-500">
          {formatDate(user.createdAt)}
        </div>
      </td>
       <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{identifier}</div>
        <div className="text-xs text-gray-500 capitalize">{identifierType}</div> {/*mostra o tipo */}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {[...new Set(user.roles)].map(role => (
            <span
              key={`${user._id}-${role}`}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                role === "ROLE_ALUNO" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {role.replace('ROLE_', '')}
            </span>
          ))}
        </div>
      </td> 
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="space-y-2">
          {rolesOptions.map(role => (
            <label key={role} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={user.roles.includes(role)}
                onChange={() => onToggleRole(user._id, role)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{role.replace('ROLE_', '')}</span>
            </label>
          ))}
        </div>
      </td>
    </tr>
  );
}