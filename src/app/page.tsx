import Devices from "@components/Devices";
import Scenes from "@components/Scenes"

export default function Home() {
  return (
    <div className="py-24 px-10 max-w-7xl">
      <div className="main"></div>
        <section>
        <Devices />
        </section>
        <section>
          <Scenes />
        </section>
      </div>
  );
}
