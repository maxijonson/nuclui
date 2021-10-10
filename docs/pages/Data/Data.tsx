import _ from "lodash";
import {
    Card,
    Checkbox,
    Container,
    Table,
    TableColumn,
    Pagination,
} from "nuclui";
import React from "react";

interface User {
    name: string;
    age: number;
    isStudent: boolean;
    status: "online" | "offline" | "away";
    campaign?: string;
}

const users: User[] = _.times(63, (i) => ({
    name: `User ${i + 1}`,
    age: _.random(18, 60),
    isStudent: _.sample([true, false]) ?? false,
    status: _.sample(["online", "offline", "away"]) ?? "offline",
    campaign: _.sample(["campaign 1", "campaign 2", "campaign 3", undefined]),
}));

const columns: TableColumn<User>[] = [
    {
        key: "rownumber",
        label: "#",
        headerClassName: "UserTable__headerCell--rownumber",
        className: "UserTable__cell--rownumber",
        render: (_user, index) => index + 1,
        align: "center",
    },
    {
        key: "name",
        label: "Name",
        headerClassName: "UserTable__headerCell--name",
        className: "UserTable__cell--name",
        render: (user) => user.name,
    },
    {
        key: "age",
        label: "Age",
        headerClassName: "UserTable__headerCell--age",
        className: "UserTable__cell--age",
        render: (user) => user.age,
        align: "right",
        sort: (a, b) => a.age - b.age,
    },
    {
        key: "campaign",
        label: "Campaign",
        headerClassName: "UserTable__headerCell--campaign",
        className: "UserTable__cell--campaign",
        render: (user) => user.campaign,
    },
    {
        key: "isStudent",
        label: "Student",
        headerClassName: "UserTable__headerCell--isStudent",
        className: "UserTable__cell--isStudent",
        render: (user) => (
            <Checkbox value={user.isStudent} readOnly noGutters />
        ),
        align: "center",
    },
    {
        key: "status",
        label: "Status",
        headerClassName: "UserTable__headerCell--status",
        className: "UserTable__cell--status",
        render: (user) => (
            <div
                className="UserTable__cell__innerContainer"
                style={{ display: "flex", alignItems: "center" }}
            >
                <div
                    className="UserTable__cell__statusCircle"
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        backgroundColor:
                            // eslint-disable-next-line no-nested-ternary
                            user.status === "online"
                                ? "green"
                                : user.status === "away"
                                ? "orange"
                                : "red",
                    }}
                />
                <div className="UserTable__cell__statusText">{user.status}</div>
            </div>
        ),
    },
];

const Data = React.memo(() => {
    const [activePage, setActivePage] = React.useState(0);

    return (
        <Container maxWidth="lg">
            <div>Data</div>
            <Table
                className="UserTable"
                items={users}
                columns={columns}
                maxRows={[5, 8, 12, 20]}
                fill
            />
            <Card>
                <Table
                    className="UserTable"
                    items={users}
                    columns={columns}
                    maxRows={[5, 8, 12, 20]}
                />
            </Card>
            <Pagination
                className="UserTable__pagination"
                count={users.length / 5}
                active={activePage}
                onPageChange={setActivePage}
                showExtremeArrows
            />
            <Pagination
                className="UserTable__pagination"
                count={users.length / 5}
                active={activePage}
                onPageChange={setActivePage}
                showExtremeArrows
                fluid
            />
            <Pagination
                className="UserTable__pagination"
                count={users.length / 5}
                active={activePage}
                onPageChange={setActivePage}
                showExtremeArrows
                fluid
                spaceEven
            />
        </Container>
    );
});

export default Data;
