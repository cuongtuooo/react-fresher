import { useCurrentApp } from "component/context/app.context";

const AppHeader = () => {
    const { user } = useCurrentApp();
    return (
        <div>
            app Header
            <div>
                {JSON.stringify(user)}
            </div>
        </div>

    )
}

export default AppHeader;