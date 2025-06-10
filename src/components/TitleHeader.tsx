const TitleHeader = ({ title, sub }: { title: string; sub: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <div>
        <h1 className="font-semibold md:text-5xl text-3xl text-center text-slate-50">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;
