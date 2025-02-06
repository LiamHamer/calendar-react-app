import { ReactElement } from "react"
import Header from "../../organisms/header"


function MainTemplate(props: { children: ReactElement[] }) {

    const containerStlye = {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridGap: '16px',
        gridTemplateAreas:'"head .""main"'

    }

    const contentStyle = {
        display: 'grid',
        gridTemplateRows: '100px 200px',
        gridGap: '16px',

    }

    return (
        <div style={containerStlye}>
            <header>
                <Header />
            </header>
            <main style={contentStyle} >
                {props.children}
            </main>
        </div>)
}

export default MainTemplate