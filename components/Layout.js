import Head from "next/head";

const Layout = props => <>
    <div className ="layout">
        <Head>
            <title>Employees Manager</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link rel="shortcut icon" href="/employees.ico" />
        </Head>
        <div className="container">
            {props.children}
        </div>
    </div>
    <style jsx> {`
        .layout {
            background-color: #E2F0FF;
            width: 100vw;
            height: 100vh;
        }
    `}
    </style>

</>;

export default Layout;