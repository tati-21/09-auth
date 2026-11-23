import css from './LayoutNotes.module.css';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default Layout;
