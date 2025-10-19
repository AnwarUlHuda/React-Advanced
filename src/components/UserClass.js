import React from "react";

class UserClass extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data:{}
        }
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/AnwarUlHuda")
        const json = await data.json();
        this.setState({
            data: json
        })
    }

    componentDidUpdate () {
        console.log('Updated');
    }

    componentWillUnmount() {
        console.log('Unmounted');
    }
    render() {
        console.log('rendered')
        const {data} = this.state;
        return (
            <div>
                <img src={data?.avatar_url} />
                <h2>Name : {data?.name}</h2>
                <h2>Location : {data?.public_repos}</h2>
                <h2>Contact : testmail@yopmail.com</h2>
                <a href={data?.html_url} target="_blank">Url</a>
            </div>
        )
    }
}

export default UserClass