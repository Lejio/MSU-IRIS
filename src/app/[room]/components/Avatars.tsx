import { useOthers, useSelf } from "@liveblocks/react/suspense";
// import styles from "./Avatars.module.css";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex px-3">
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className="flex items-center justify-center relative border-4 border-white rounded-full w-10 h-10 bg-gray-400 -ml-3 group" data-tooltip={name}>
        <span className="absolute top-full opacity-0 transition-opacity duration-150 ease-in-out p-1.5 text-white text-xs rounded-lg mt-2 z-10 bg-black whitespace-nowrap group-hover:opacity-100">
            {name}
        </span>
      <img
        src={picture}
        className="w-full h-full rounded-full"
        data-tooltip={name}
      />
    </div>
  );
}
