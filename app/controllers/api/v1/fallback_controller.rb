class Api::V1::FallbackController < ApplicationController
    def fallback_index
        render file: 'public/index.html'
    end
end
