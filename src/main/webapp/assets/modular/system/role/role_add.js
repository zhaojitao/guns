/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var RoleAddDlg = {
    data: {
        name: "",
        pName: "",
        pid: "",
        tips: "",
        deptName: "",
        deptid: "",
        num: ""
    }
};

/**
 * 关闭此对话框
 */
RoleAddDlg.close = function () {
    parent.layer.close(window.parent.Role.layerIndex);
};

/**
 * 验证表单
 */
RoleAddDlg.validateForm = function () {

    var data = RoleAddDlg.data;

    if (!data.name) {
        return "请输入角色名称";
    }
    if (!(data.pName)) {
        return "请输入上级名称";
    }
    if (!data.deptName) {
        return "请输入部门名称";
    }
    if (!data.tips) {
        return "请输入别名";
    }

    return true;
};

/**
 * 提交添加角色
 */
RoleAddDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/role/add", function (data) {
        Feng.success("添加成功!");
        window.parent.Role.table.refresh();
        RoleAddDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

$(function () {

    RoleAddDlg.app = new Vue({
        el: '#roleForm',
        data: RoleAddDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            showDeptSelectTree: function () {
                var formName = encodeURIComponent("parent.RoleAddDlg.app.deptName");
                var formId = encodeURIComponent("parent.RoleAddDlg.app.deptid");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/dept/tree");

                layer.open({
                    type: 2,
                    title: '部门选择',
                    area: ['300px', '320px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            showParentSelectTree: function () {
                var formName = encodeURIComponent("parent.RoleAddDlg.app.pName");
                var formId = encodeURIComponent("parent.RoleAddDlg.app.pid");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/role/roleTreeList");

                layer.open({
                    type: 2,
                    title: '父级角色选择',
                    area: ['300px', '320px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            ensure: function () {
                var result = RoleAddDlg.validateForm();
                if (result === true) {
                    RoleAddDlg.addSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                RoleAddDlg.close();
            }
        }
    });

});