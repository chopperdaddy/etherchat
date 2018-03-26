import {Component} from 'react';
import {
    Menu,
    Container,
    Button,
    Label,
    Loader,
    List
} from 'semantic-ui-react';
import Head from 'next/head';
import web3 from '../ethereum/web3';

class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.account = props.account;
        this.state = {address: "", balance: "", network: 4};
    }

    clearPrivateKey = () => {
        window.localStorage.clear();
    }

    joinContract = () => {
        this.account.joinContract();
    }

    componentDidMount() {
        this.getAccountInfo();
    }

    getAccountInfo = () => {
        if (this.account.isValid) {
            var balance = parseFloat(web3.utils.fromWei(this.account.balance, 'ether')).toFixed(6);
            this.setState({address: this.account.getAddress(), balance: balance});
        } else {
            setTimeout(this.getAccountInfo, 800);
        }
    }

    

    render() {
        var accountInfo = (<Loader active />);
        if (this.state.address != "") {
            accountInfo = (
                <Menu.Item>
                    <List>
                    <List.Item>{this.state.address.substr(0,14) + '...'}</List.Item>
                    <List.Item><Label color='green'>{this.state.balance + ' ETH' }</Label></List.Item>
                    </List>
                </Menu.Item>
            );
        }

        return (
            <Menu fixed='top'>
                <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                </Head>
                <Container>
                <Menu.Item>Project name</Menu.Item>
                <Menu.Item>About zzz</Menu.Item>
                <Menu.Menu position='right'>
                    {accountInfo}
                    <Menu.Item>
                        <Button primary onClick={this.joinContract}>Join zzz</Button>
                        <Button onClick={this.clearPrivateKey} primary>Clear</Button>
                    </Menu.Item>
                </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

export default HeaderMenu;