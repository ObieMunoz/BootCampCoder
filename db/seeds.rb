## ADMIN ACCOUNTS
User.create(email: 'obiemunozjr@gmail.com', password: 'obie', github_username: 'obiemunoz', admin: true)

## TEST USERS
User.create(email: 'joshua@gmail.com', password: '1', github_username:'jdhawks2132', admin: false)

## FAKER DATA
5.times do
    User.create(email:Faker::Internet.email, password: 'password')
end

25.times do
    question = Question.create(title:Faker::Lorem.sentence, body:Faker::Lorem.paragraph, user_id:User.all.sample.id)
end

100.times do
    Comment.create(question_id:Question.all.sample.id, body:Faker::Lorem.paragraph, user_id:User.all.sample.id)
end