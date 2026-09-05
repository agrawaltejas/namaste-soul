import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="label-eyebrow mb-6 text-primary">Error 404</div>
        <h1 className="text-display-md font-display font-light">
          This path
          <span className="italic"> leads nowhere</span>
        </h1>
        <p className="mt-6 font-light leading-relaxed text-muted-foreground">
          We couldn't find <span className="text-foreground">{location.pathname}</span>.
          It may have moved, or the event may have passed.
        </p>
        <a href="/" className="label-eyebrow link-underline mt-10 inline-block text-primary">
          Return home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
