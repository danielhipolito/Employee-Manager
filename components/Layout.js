import Head from "next/head";

const Layout = props => <>
    <Head>
        <title>Employees Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/employees.ico" />
    </Head>
    <div className="container">
        {props.children}
    </div>
</>;

export default Layout;