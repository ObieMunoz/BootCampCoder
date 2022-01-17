class ApplicationController < ActionController::API
    def fallback_index
        render file: 'public/index.html'
    end
end
