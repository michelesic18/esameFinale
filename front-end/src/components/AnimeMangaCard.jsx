import { Link } from "react-router-dom";

function AnimeMangaCard({ title, list, type }) {
  if (!Array.isArray(list)) {
    return (
      <div>
        <p>Errore: la lista non è valida</p>
      </div>
    );
  }

  const contentType = type === "anime" ? "anime" : "manga";

  return (
    <div className="flex flex-col pl-4">
      <p className="text-[#e9eaee] text-center text-lg font-bold pb-2">
        {title}
      </p>
      <div className="flex overflow-x-auto gap-6 min-w-screen bg-transparent">
        {list.map((item) => (
          <div key={item.mal_id}>
            <Link to={`/${contentType}/${item.mal_id}`}>
              <div className="flex flex-col items-center ">
                <div className="w-32 max-h-48">
                  {item.images && item.images.jpg && (
                    <img
                      src={item.images.jpg.large_image_url}
                      alt={item.title}
                      className="w-full  object-cover rounded-md h-48"
                    />
                  )}
                </div>
                <div className="text-center font-normal text-[#e9eaee]  ">
                  {item.title}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeMangaCard;
