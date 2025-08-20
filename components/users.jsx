import { getUsers } from "@/app/actions/email";

export async function Users() {
  const users = await getUsers();

  return (
    <>
      {users.length > 0 && (
        <div className="flex flex-col gap-4 mt-4 border-white border-2 p-5 rounded-md">
          {users.map((user) => {
            return (
              <div key={user._id} className="text-white">
                <div>{user.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
