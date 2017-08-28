pragma solidity ^0.4.11;

contract Token {
    string public name;
    string public ticker;
    uint8 public decimals;
    uint256 public supply;

    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function Token(string _name, string _ticker, uint8 _decimals, uint256 _supply) {
        name = _name;
        ticker = _ticker;
        decimals = _decimals;
        supply = _supply;
        balances[msg.sender] = _supply;
    }

    function transfer(address _to, uint256 _value) returns (bool) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool) {
        require(allowances[_from][msg.sender] >= _value);
        allowances[_from][msg.sender] -= _value;
        balances[_from] -=  _value;
        balances[_to] += _value;
        return true;
    }

    function approve(address _spender, uint256 _value) returns (bool) {
        require(balances[msg.sender] >= _value);
        allowances[msg.sender][_spender] += _value;
        return true;
    }

    function balanceOf(address _who) returns (uint) {
        balances[_who] = 10;
        return balances[_who];
    }
}
