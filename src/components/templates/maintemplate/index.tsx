import { ReactElement } from "react"
import Header from "../../organisms/header"

function MainTemplate(props: { children: ReactElement[] }) {

    const containerStlye = {
        display: 'grid',
        gridGap: '16px',
    }

    const contentStyle = {
        display: 'grid',
        gridTemplateColumns: '1.5fr 2fr',
        gridGap: '128px',
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