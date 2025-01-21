class ApiControllerTest < ActionDispatch::IntegrationTest
  test "password_strength" do
    post api_password_strength_path, params: { password: '123' }
    assert_response :success
    assert_equal response.body, "{\"score\":0}"
  end

  test "create_account fails with missing username" do
    post api_create_account_path, params: { password: '123' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], "param is missing or the value is empty: username"
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { username: '123' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], "param is missing or the value is empty: password"
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { username: '1234', password: 'isdfuhsifihsu23498' }
    assert_response :unprocessable_entity
    # assert_equal "", response
    assert_equal JSON.parse(response.body)['errors'][0], "Username is too short (minimum is 10 characters)"
  end

  test "create_account fails with weak password" do
    post api_create_account_path, params: { username: '1234567890', password: '1234567890123456789a' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], "Weak password"
  end

  test "create_account succeeds with valid username and password" do
    post api_create_account_path, params: { username: '1234567890', password: 'StrongPass12345' }
    assert_response :created
    assert_equal JSON.parse(response.body)['success'], true
  end

  test "create_account fails with password with no letter" do
    post api_create_account_path, params: { username: '1234567890', password: '12345678901234567890' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], "Password must include at least one letter and one number"
  end

  test "create_account fails with password with no number" do
    post api_create_account_path, params: { username: '1234567890', password: 'abcdefghijABCDEFGHIJ' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], "Password must include at least one letter and one number"
  end

  test "create_account fails with password that has Zxcvbn score < 2" do
    post api_create_account_path, params: { username: '1234567890', password: 'password123' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors'], "Weak password"
  end
end
