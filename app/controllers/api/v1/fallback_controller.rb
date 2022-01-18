class Api::V1::FallbackController < ApplicationController::Base
    def fallback_index
        render file: 'public/index.html'
    end
end
