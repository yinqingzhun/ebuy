//定义一个支持new操作和直接执行的构造函数
function User(name, password) {
    var self = this instanceof User ? this :
    function (p) {
        function C() { };
        C.prototype = p;
        return new C();
    }(User.prototype);
    self.name = name;
    self.password = password;
    return self;

}