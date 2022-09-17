Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  root :to => 'home#index'
  get '/products', :to => 'products#index'
  mount ShopifyApp::Engine, at: '/'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  if Rails.env.development?
    redirector = ->(params, _) { ApplicationController.helpers.asset_path("#{params[:name].split('-').first}.map") }
    constraint = ->(request) { request.path.ends_with?(".map") }
    get "assets/*name", to: redirect(redirector), constraints: constraint
  end
end
