function AccountCtrl($scope, $resource, $routeParams, routeService, $cookies, $location) {

    routeService.updateNavigation();
    $scope.profile = false;
    $scope.accounts = false;
    $scope.selectedAccount = null;

    var Profile = $resource('/users/:userId', {userId:'@id'},
        {
            'update':{
                method:'PUT'
            }
        }
    );

    var Account = $resource('users/:user_id/accounts/:id', {user_id:'@user_id', id:'@id'},
        {
            'update':{
                method:'PUT'
            }
        }
    );

    var Transaction = $resource('users/:user_id/accounts/:account_id/transactions/:id', {user_id:'@user_id', account_id:'@account_id', id:'@id'},
        {
            'update':{
                method:'PUT'
            }
        }
    );


    /***********
     * PROFILE *
     **********/
    if ($location.url().indexOf("profile") != -1) {
        $scope.profile = true;

        if ($scope.user == null || $scope.user == undefined) {
            $scope.user = Profile.get({userId:$cookies.auth_key}, function (user) {
                $scope.user = user;
            });
        }
    }

    $scope.updateProfile = function () {
        if (!$scope.userForm.$invalid) {
            Profile.update({'id':$scope.user._id, 'user':$scope.user}, function (user) {
                $scope.newAccount = user;
            });
        }
    };

    /***********
     * ACCOUNT *
     **********/

    /**
     * Loading all accounts for the logged in User
     */
    if ($location.url().indexOf("accounts") != -1) {
        $scope.accounts = true;
        if (!objectDefined($scope.accountList)) {
            loadAccounts($cookies.auth_key);
        }

    }

    /**
     * Create a new Account.
     */
    $scope.createAccount = function () {
        //only proceed if all inputs in the form ar
        if (!$scope.newAccountForm.$invalid) {
            //call the serverApi for persisting a new Account
            Account.save({'user_id':$cookies.auth_key}, $scope.newAccount, function (account) {
                //Step 1: Clear the newAccount to reset the form
                $scope.newAccount = null;
                //Step 2: Set the selected Account in the scope to the newly created one
                $scope.selectAccount(account);
                //Step 3: Add the newly created Account to the Account List
                $scope.accountList.push(account);
            });
        }
    }

    /**
     * Update a new Account
     */
    $scope.updateAccount = function () {
        Account.update({'user_id':$cookies.auth_key, 'id':$scope.selectedAccount._id, 'account':$scope.selectedAccount});
    }

    $scope.removeAccount = function () {
        if (confirm("Löschen?")) {

            var id = $scope.selectedAccount._id;
            Account.delete({ 'user_id':$cookies.auth_key, 'id':$scope.selectedAccount._id }, function () {
                $scope.selectedAccount = null;
                $scope.transactions = null;
                $scope.accountList.removeById(id);
            });
        }
    }

    $scope.selectAccount = function (account) {
        $scope.selectedAccount = account;
        if(objectDefined($scope.selectedAccount))
        {
            routeService.updateParam('selectedAccount', $scope.selectedAccount._id);
        }
    }

    function loadAccounts(userId) {
        Account.query({'user_id':userId}, function(accountList)
        {
            $scope.accountList = accountList;
            if(objectDefined($routeParams.selectedAccount))
            {
                $scope.selectAccount(accountList.getById($routeParams.selectedAccount))
            }
        });
    }


    /*
     * Transactions
     */
    $scope.createTransaction = function () {
        if (!$scope.newTransactionForm.$invalid) {
            Transaction.save({'user_id':$cookies.auth_key, 'account_id':$scope.selectedAccount._id}, $scope.transaction, function (transaction) {
                $scope.transaction = null;
                $scope.selectedAccount.transactions.push(transaction);
            });
        }
    }

    $scope.updateTransaction = function (transaction) {
        Transaction.update({'user_id':$cookies.auth_key, 'account_id':$scope.selectedAccount._id, 'id':transaction._id, 'transaction':transaction});
    }

    $scope.removeTransaction = function (transaction) {
        if (confirm("Löschen?")) {
            var id = transaction._id;
            Transaction.delete({'user_id':$cookies.auth_key, 'account_id':$scope.selectedAccount._id, 'id':transaction._id}, function () {
                $scope.selectedAccount.transactions.removeById(id);
            });
        }
    }


//    function loadTransactions(userId, accountId) {
//        $scope.selectedAccount.transactions = Transaction.query({'user_id':userId, 'account_id':accountId});
//    }


}